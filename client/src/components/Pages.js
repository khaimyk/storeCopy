import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { AppContext } from "./AppContext";

const Pages = observer(() => {
  const { device } = useContext(AppContext);
  const pageCount = Math.ceil(device.totalCount / device.limit);
  const pages = [];
  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }
  return (
    <ul>
      {pages.map((page) => (
        <li key={page}>
          <button onClick={() => device.setPage(page)}>{page}</button>
        </li>
      ))}
    </ul>
  );
});

export default Pages;
