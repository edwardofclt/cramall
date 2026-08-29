import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { pageVariants } from './app/motion';
import { useReducedMotionPref } from './app/useReducedMotionPref';
import { LessonPlayer } from './lesson/LessonPlayer';
import { ProgressProvider } from './progress/ProgressContext';
import { Home } from './screens/Home';
import { SubjectMap } from './screens/SubjectMap';

/** Wraps a routed screen so it slides in/out with the shared page transition. */
function Page({ children }: { children: ReactNode }) {
  const reduced = useReducedMotionPref();
  const animation = reduced
    ? {}
    : { variants: pageVariants, initial: 'initial', animate: 'enter', exit: 'exit' };
  return <motion.main {...animation}>{children}</motion.main>;
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
          path="/lesson/:lessonId"
          element={
            <Page>
              <LessonPlayer />
            </Page>
          }
        />
        <Route
          path="/lesson/:lessonId/quiz"
          element={
            <Page>
              <ComingSoon title="Quick Check" />
            </Page>
          }
        />
        <Route
          path="/progress"
          element={
            <Page>
              <ComingSoon title="My Progress" />
            </Page>
          }
        />
        <Route
          path="/parent"
          element={
            <Page>
              <ComingSoon title="Parent Corner" />
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
