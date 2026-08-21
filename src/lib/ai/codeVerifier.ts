export interface CodeVerificationResult {
  hasSyntaxError: boolean;
  errorType?: string;
  errorMessage?: string;
  suggestedFix?: string;
  executionAnalysis?: string;
}

export function verifyCode(code: string, language: string = 'python'): CodeVerificationResult {
  const trimmed = (code || '').trim();
  if (!trimmed) {
    return {
      hasSyntaxError: false,
      executionAnalysis: 'No code provided for verification.',
    };
  }

  if (language === 'python') {
    const lines = trimmed.split('\n');

    // 1. Missing Colon check (for def, if, elif, else, for, while, try, except, class)
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (/^(def|if|elif|else|for|while|try|except|class)\b/.test(line) && !line.endsWith(':') && !line.includes('#')) {
        return {
          hasSyntaxError: true,
          errorType: 'SyntaxError',
          errorMessage: `SyntaxError: expected ':' at line ${i + 1}`,
          suggestedFix: `Add a colon \`:\` at the end of line ${i + 1}: \`${lines[i]}\``,
          executionAnalysis: `[VERIFIER WARNING]: Line ${i + 1} is missing a trailing colon \`:\`. In Python, compound statements (def, if, for, while, etc.) MUST end with a colon.`,
        };
      }
    }

    // 2. Unmatched Parentheses or Brackets check
    let openParen = 0;
    let openBracket = 0;
    let openBrace = 0;
    for (const char of trimmed) {
      if (char === '(') openParen++;
      if (char === ')') openParen--;
      if (char === '[') openBracket++;
      if (char === ']') openBracket--;
      if (char === '{') openBrace++;
      if (char === '}') openBrace--;
    }

    if (openParen !== 0 || openBracket !== 0 || openBrace !== 0) {
      return {
        hasSyntaxError: true,
        errorType: 'SyntaxError',
        errorMessage: 'SyntaxError: unmatched parentheses, brackets, or braces',
        suggestedFix: 'Ensure every opening `(`, `[`, or `{` has a corresponding closing `)`, `]`, or `}`.',
        executionAnalysis: '[VERIFIER WARNING]: Code contains unmatched parentheses or brackets.',
      };
    }

    // 3. Simple Indentation Check
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim().length > 0 && /^[ ]{1,3}[^\s]/.test(line)) {
        return {
          hasSyntaxError: true,
          errorType: 'IndentationError',
          errorMessage: `IndentationError: unexpected indent at line ${i + 1}`,
          suggestedFix: `Use standard 4-space indentation for line ${i + 1}.`,
          executionAnalysis: `[VERIFIER WARNING]: Line ${i + 1} has irregular indentation. Standard Python indentation is 4 spaces per block level.`,
        };
      }
    }
  }

  return {
    hasSyntaxError: false,
    executionAnalysis: 'Static analysis passed without syntax anomalies detected.',
  };
}
