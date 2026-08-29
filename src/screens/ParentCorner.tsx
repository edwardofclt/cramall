import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import standardsData from '../content/standards/standards.json';
import { allLessons } from '../content/subjects';
import { exportSave } from '../progress/storage';
import { useProgress } from '../progress/ProgressContext';

type StandardsSource = { document: { title: string; url: string } };

function lessonStatus(status: 'in-progress' | 'passed' | undefined): string {
  if (status === 'passed') return 'Passed';
  if (status === 'in-progress') return 'In progress';
  return 'Not started';
}

export function ParentCorner() {
  const { save, setParentChecked, importJson, reset } = useProgress();
  const [message, setMessage] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const importRequest = useRef(0);
  const activeReader = useRef<FileReader | null>(null);

  const invalidateImport = () => {
    importRequest.current += 1;
    const reader = activeReader.current;
    activeReader.current = null;
    reader?.abort();
    return importRequest.current;
  };

  useEffect(() => () => {
    invalidateImport();
  }, []);

  const handleExport = () => {
    const blob = new Blob([exportSave(save)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'cramall-progress.json';
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage('Progress exported.');
  };

  const handleImport = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const request = invalidateImport();
    const reader = new FileReader();
    activeReader.current = reader;
    reader.onload = () => {
      if (request !== importRequest.current) return;
      activeReader.current = null;
      try {
        const json = typeof reader.result === 'string' ? reader.result : '';
        importJson(json);
        setMessage('Progress imported.');
      } catch (error: unknown) {
        setMessage(error instanceof Error ? error.message : 'invalid save file');
      }
      event.target.value = '';
    };
    reader.onerror = () => {
      if (request !== importRequest.current) return;
      activeReader.current = null;
      setMessage('Unable to read the selected file.');
      event.target.value = '';
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirmation !== 'RESET') return;
    invalidateImport();
    reset();
    setConfirmation('');
    setMessage('Progress reset.');
  };

  const standardSources = Object.values(standardsData as Record<string, StandardsSource>);

  return (
    <div className="page stack parent-corner">
      <header>
        <h1>Parent Corner</h1>
        <p>Spot-check learning, save a copy of progress, or start fresh.</p>
      </header>

      <section className="card stack" aria-labelledby="spot-check-heading">
        <h2 id="spot-check-heading">Lesson spot-checks</h2>
        <div className="parent-table-wrap">
          <table>
            <thead><tr><th>Lesson</th><th>Status</th><th>Parent checked</th></tr></thead>
            <tbody>
              {allLessons().map((lesson) => (
                <tr key={lesson.id}>
                  <td>{lesson.title}</td>
                  <td>{lessonStatus(save.lessons[lesson.id]?.status)}</td>
                  <td>
                    <label className="parent-check-target">
                      <input
                        type="checkbox"
                        checked={save.parentChecked[lesson.id] ?? false}
                        onChange={(event) => setParentChecked(lesson.id, event.target.checked)}
                      />
                      <span>Mark checked: {lesson.title}</span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card stack" aria-labelledby="progress-file-heading">
        <h2 id="progress-file-heading">Progress file</h2>
        <div className="row parent-actions">
          <button className="btn btn-primary" type="button" onClick={handleExport}>Export progress</button>
          <label className="btn" htmlFor="progress-import">Import progress file</label>
          <input id="progress-import" className="sr-only" type="file" accept="application/json,.json" onChange={handleImport} />
        </div>
        {message && <p role="alert" className="parent-message">{message}</p>}
      </section>

      <section className="card stack" aria-labelledby="reset-heading">
        <h2 id="reset-heading">Reset progress</h2>
        <label htmlFor="reset-confirmation">Type RESET to enable this action.</label>
        <div className="row parent-actions">
          <input id="reset-confirmation" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} />
          <button className="btn btn-bad" type="button" disabled={confirmation !== 'RESET'} onClick={handleReset}>Reset progress</button>
        </div>
      </section>

      <section className="card stack" aria-labelledby="standards-heading">
        <h2 id="standards-heading">Standards sources</h2>
        <ul>
          {standardSources.map(({ document }) => <li key={document.url}><a href={document.url}>{document.title}</a></li>)}
        </ul>
      </section>

      <div><Link className="link-quiet" to="/">Back home</Link></div>
    </div>
  );
}
