import { useEffect, useRef, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { pageVariants } from './app/motion';
import { useReducedMotionPref } from './app/useReducedMotionPref';
import { SpiralLesson } from './review/SpiralLesson';
import { ReviewScreen } from './review/ReviewScreen';
import { ProgressProvider } from './progress/ProgressContext';
import { QuickCheck } from './quiz/QuickCheck';
import { Home } from './screens/Home';
import { ParentCorner } from './screens/ParentCorner';
import { ProgressScreen } from './screens/ProgressScreen';
import { SubjectMap } from './screens/SubjectMap';

/** Wraps a routed screen so it slides in/out with the shared page transition. */
function Page({ children }: { children: ReactNode }) {
  const reduced = useReducedMotionPref();
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => {
    mainRef.current?.focus();
  }, []);
  const animation = reduced
    ? {}
    : { variants: pageVariants, initial: 'initial', animate: 'enter', exit: 'exit' };
  return <motion.main ref={mainRef} tabIndex={-1} {...animation}>{children}</motion.main>;
}

/** Placeholder for routes that later tasks fill in (lesson, quiz, progress, parent). */
function ComingSoon({ title }: { title: string }) {
  return (
    <div className="page stack">
      <h1>{title}</h1>
      <p>This part of Cram All is still being built. Check back soon!</p>
      <div>
        <Link className="btn btn-primary" to="/">
          Back home
        </Link>
      </div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Page>
              <Home />
            </Page>
          }
        />
        <Route
          path="/subject/:subjectId"
          element={
            <Page>
              <SubjectMap />
            </Page>
          }
        />
        <Route
          path="/subject/:subjectId/review"
          element={<Page><ReviewScreen /></Page>}
        />
        <Route
          path="/lesson/:lessonId"
          element={
            <Page>
              <SpiralLesson />
            </Page>
          }
        />
        <Route
          path="/lesson/:lessonId/quiz"
          element={
            <Page>
              <QuickCheck />
            </Page>
          }
        />
        <Route
          path="/progress"
          element={
            <Page>
              <ProgressScreen />
            </Page>
          }
        />
        <Route
          path="/parent"
          element={
            <Page>
              <ParentCorner />
            </Page>
          }
        />
        <Route
          path="*"
          element={
            <Page>
              <ComingSoon title="Page not found" />
            </Page>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ProgressProvider>
      <HashRouter>
        <AnimatedRoutes />
      </HashRouter>
    </ProgressProvider>
  );
}

export default App;
