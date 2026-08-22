export function EmptyState({ file }: { file: string }) {
  return (
    <div className="rounded-md border border-dashed border-line px-6 py-10 text-center">
      <p className="font-mono text-xs text-ink-faint">
        No content yet — add entries in <span className="text-amber">{file}</span>
      </p>
    </div>
  );
}
