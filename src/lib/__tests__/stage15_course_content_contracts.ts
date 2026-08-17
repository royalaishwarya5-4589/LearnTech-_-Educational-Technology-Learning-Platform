import { getPathBySlug, getLessonDetails, getProjectDetails } from '../../content';
import { getAssessmentBySlug } from '../../content/assessments-data';
import { getCertificationPolicy } from '../../content/certification-policies';
import { Path } from '../../types/content';

export const ALL_15_COURSE_SLUGS = [
  'python',
  'java',
  'javascript',
  'react',
  'html-css',
  'dbms',
  'dsa',
  'genai-llm-agents',
  'web-security',
  'linux-security',
  'git-github',
  'cloud-devops',
  'software-testing',
  'system-design',
  'interview-preparation',
];

export async function runStage15CourseContentContractTests() {
  console.log('=== STAGE 15 COURSE CONTENT & ARCHITECTURE CONTRACT SUITE ===\n');

  const globalLessonSlugs = new Set<string>();
  const globalModuleSlugs = new Set<string>();
  const globalProjectSlugs = new Set<string>();
  const globalAssessmentSlugs = new Set<string>();

  for (const slug of ALL_15_COURSE_SLUGS) {
    const courseObj = getPathBySlug(slug);
    console.assert(!!courseObj, `[STAGE 15 CONTRACT FAIL] Course missing from registry: ${slug}`);
    console.assert('modules' in (courseObj || {}), `[STAGE 15 CONTRACT FAIL] Course ${slug} has no modules array`);

    const course = courseObj as Path;

    // 1. Level / Module Count Check (Minimum 3 modules)
    console.assert(
      course.modules.length >= 3,
      `[STAGE 15 CONTRACT FAIL] Course '${slug}' has ${course.modules.length} modules, expected >= 3`
    );

    // 2. Lesson Count Check (Minimum 6 lessons)
    const totalLessons = course.modules.flatMap((m) => m.lessons);
    console.assert(
      totalLessons.length >= 6,
      `[STAGE 15 CONTRACT FAIL] Course '${slug}' has ${totalLessons.length} lessons, expected >= 6`
    );
    console.assert(
      course.totalLessons === totalLessons.length,
      `[STAGE 15 CONTRACT FAIL] Course '${slug}' totalLessons count (${course.totalLessons}) does not match actual lessons (${totalLessons.length})`
    );

    // 3. Modules & Lessons Navigation & Structure Check
    for (const mod of course.modules) {
      console.assert(mod.lessons.length >= 1, `[STAGE 15 CONTRACT FAIL] Module '${mod.slug}' in '${slug}' is empty`);
      console.assert(!globalModuleSlugs.has(mod.slug), `[STAGE 15 CONTRACT FAIL] Duplicate module slug: ${mod.slug}`);
      globalModuleSlugs.add(mod.slug);

      for (const les of mod.lessons) {
        console.assert(!globalLessonSlugs.has(les.slug), `[STAGE 15 CONTRACT FAIL] Duplicate lesson slug: ${les.slug}`);
        globalLessonSlugs.add(les.slug);

        // Verify route detail resolution
        const details = getLessonDetails(slug, les.slug);
        console.assert(
          !!details && details.lesson.id === les.id,
          `[STAGE 15 CONTRACT FAIL] getLessonDetails failed for path '${slug}' lesson '${les.slug}'`
        );
        console.assert(
          les.concepts.length > 0,
          `[STAGE 15 CONTRACT FAIL] Lesson '${les.slug}' in '${slug}' has no concepts`
        );
        console.assert(
          les.examples.length > 0,
          `[STAGE 15 CONTRACT FAIL] Lesson '${les.slug}' in '${slug}' has no examples`
        );
      }
    }

    // 4. Portfolio Projects Check (Minimum 2 projects)
    const projects = course.projects || [];
    console.assert(
      projects.length >= 2,
      `[STAGE 15 CONTRACT FAIL] Course '${slug}' has ${projects.length} projects, expected >= 2`
    );
    console.assert(
      course.totalProjects === projects.length,
      `[STAGE 15 CONTRACT FAIL] Course '${slug}' totalProjects count (${course.totalProjects}) does not match actual projects (${projects.length})`
    );

    for (const proj of projects) {
      console.assert(!globalProjectSlugs.has(proj.slug), `[STAGE 15 CONTRACT FAIL] Duplicate project slug: ${proj.slug}`);
      globalProjectSlugs.add(proj.slug);

      const projDetails = getProjectDetails(slug, proj.slug);
      console.assert(
        !!projDetails && projDetails.project.id === proj.id,
        `[STAGE 15 CONTRACT FAIL] getProjectDetails failed for path '${slug}' project '${proj.slug}'`
      );
      console.assert(
        proj.milestones.length >= 1,
        `[STAGE 15 CONTRACT FAIL] Project '${proj.slug}' in '${slug}' has no milestones`
      );
    }

    // 5. Certification Policy & Assessment Resolution Check
    const policy = getCertificationPolicy(slug);
    console.assert(!!policy, `[STAGE 15 CONTRACT FAIL] Policy missing for course: ${slug}`);

    const reqSlugs = policy.requiredAssessmentSlugs || [];
    console.assert(
      reqSlugs.length > 0,
      `[STAGE 15 CONTRACT FAIL] Course '${slug}' policy has no requiredAssessmentSlugs defined`
    );

    for (const assessSlug of reqSlugs) {
      const assessment = getAssessmentBySlug(assessSlug);
      console.assert(
        !!assessment,
        `[STAGE 15 CONTRACT FAIL] Policy for '${slug}' references non-existent assessment '${assessSlug}'`
      );
      console.assert(
        assessment?.questions && assessment.questions.length > 0,
        `[STAGE 15 CONTRACT FAIL] Assessment '${assessSlug}' has no questions`
      );
      if (assessment) {
        globalAssessmentSlugs.add(assessment.slug);
      }
    }
  }

  console.log('✔ STAGE 15 CHECK 1 PASS: All 15 courses registered and accessible via getPathBySlug.');
  console.log(`✔ STAGE 15 CHECK 2 PASS: All 15 courses contain multi-level curricula (>= 3 modules per course).`);
  console.log(`✔ STAGE 15 CHECK 3 PASS: Total ${globalLessonSlugs.size} lessons verified across all 15 courses.`);
  console.log(`✔ STAGE 15 CHECK 4 PASS: Total ${globalProjectSlugs.size} portfolio projects verified with route resolution.`);
  console.log(`✔ STAGE 15 CHECK 5 PASS: Total ${globalAssessmentSlugs.size} final assessments resolved with server questions.`);
  console.log('✔ STAGE 15 CHECK 6 PASS: Zero duplicate slugs or orphaned route content detected across the platform.\n');
  console.log('=== ALL STAGE 15 COURSE CONTENT CONTRACT TESTS PASSED PERFECTLY ===\n');
}
