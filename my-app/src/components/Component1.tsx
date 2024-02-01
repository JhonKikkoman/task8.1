/** @format */

import { useJsonFetch } from './useJsonFetch';

export function Component1() {
  const { data } = useJsonFetch('http://localhost:7070/data');

  return (
    <>
      <span>{`Component1 - ${data}`}</span>
    </>
  );
}
