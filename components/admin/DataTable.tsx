import type { ReactNode } from "react";

export function DataTable<T>({
  items,
  columns,
  rowActions,
  empty = "Nothing here yet.",
}: {
  items: T[];
  columns: { header: string; cell: (item: T) => ReactNode; className?: string }[];
  rowActions?: (item: T) => ReactNode;
  empty?: string;
}) {
  if (items.length === 0) {
    return <p className="py-12 text-center text-canvas/60">{empty}</p>;
  }

  return (
    <div className="overflow-x-auto border border-canvas/15">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-canvas/15">
            {columns.map((col) => (
              <th key={col.header} className="label px-4 py-3 text-canvas/60">
                {col.header}
              </th>
            ))}
            {rowActions && <th className="px-4 py-3" />}
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} className="border-b border-canvas/10 last:border-b-0">
              {columns.map((col) => (
                <td key={col.header} className={`px-4 py-3 text-canvas-deep ${col.className ?? ""}`}>
                  {col.cell(item)}
                </td>
              ))}
              {rowActions && (
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  {rowActions(item)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
