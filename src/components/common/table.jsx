import React from "react";

export default function DynamicTable({
  columns,
  data,
  actions = [],
  statusClasses = {},
  pagination = null, // { currentPage, totalPages, onPageChange }
}) {
  return (
    <div className="p-6 bg-white shadow rounded-lg flex flex-col w-full flex-1 overflow-hidden">
      <div className="overflow-auto flex-1 w-full">
        <table className="w-full text-left">
          <thead className="text-sm text-gray-600 border-b">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  className="py-2 bg-white sticky top-0 z-10 text-nowrap"
                >
                  {col.header}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="py-2 bg-white sticky top-0 z-10">Action</th>
              )}
            </tr>
          </thead>
          <tbody className="text-sm">
            {data.map((item, idx) => (
              <tr key={idx} className="border-b last:border-0">
                {columns.map((col) => (
                  <td key={col.accessor} className="py-3 text-nowrap">
                    {col.render
                      ? col.render(item[col.accessor], item)
                      : item[col.accessor]}
                  </td>
                ))}
                {actions.length > 0 && (
                  <td className="py-3">
                    <div className="flex gap-2">
                      {actions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => action.onClick(item)}
                          className={`${action.className} px-3 py-2 text-xs font-medium rounded-lg focus:ring-4 focus:outline-none`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="pt-4">
          <pagination.Component
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            handlePageChange={pagination.onPageChange}
          />
        </div>
      )}
    </div>
  );
}
