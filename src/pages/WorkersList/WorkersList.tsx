import { MouseEventHandler, useCallback, useState } from "react";
import data from "../../API/db.json";
import "./WorkersList.scss";

type Data = typeof data;

type SortKeys = keyof Data[0];

type SortOrder = "ascn" | "desc";

const sortData = ({
  tableData,
  sortKey,
  reverse,
}: {
  tableData: Data;
  sortKey: SortKeys;
  reverse: boolean;
}) => {
  if (!sortKey) return tableData;

  const sortedData = [...tableData].sort((a, b) =>
    a[sortKey] > b[sortKey] ? 1 : -1
  );

  if (reverse) {
    return sortedData.reverse();
  }

  return sortedData;
};

const SortButton = ({
  sortOrder,
  columnKey,
  sortKey,
  onClick,
}: {
  sortOrder: SortOrder;
  columnKey: SortKeys;
  sortKey: SortKeys;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => (
  <button
    onClick={onClick}
    className={`${
      sortKey === columnKey && sortOrder === "desc"
        ? "sort-button sort-reverse"
        : "sort-button"
    }`}
  >
    ▲
  </button>
);

const WorkersList = ({ data }: { data: Data }) => {
  const [sortKey, setSortKey] = useState<SortKeys>("lastName");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");

  const headers: { key: SortKeys; label: string }[] = [
    { key: "id", label: "ID" },
    { key: "firstName", label: "First name" },
    { key: "lastName", label: "Last name" },
    { key: "salary", label: "Salary" },
    { key: "statusOfWork", label: "Status of work" },
  ];

  const sortedData = useCallback(
    () => sortData({ tableData: data, sortKey, reverse: sortOrder === "desc" }),
    [data, sortKey, sortOrder]
  );

  const changeSort = (key: SortKeys) => {
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");
    setSortKey(key);
  };

  return (
    <table>
      <thead>
        <tr>
          {headers.map((row) => (
            <th key={row.key}>
              {row.label}{" "}
              <SortButton
                columnKey={row.key}
                onClick={() => changeSort(row.key)}
                {...{
                  sortOrder,
                  sortKey,
                }}
              />
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {sortedData().map((worker) => (
          <tr key={worker.id}>
            <td>{worker.id}</td>
            <td>{worker.firstName}</td>
            <td>{worker.lastName}</td>
            <td>{worker.salary}</td>
            <td>{worker.statusOfWork}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WorkersList;
