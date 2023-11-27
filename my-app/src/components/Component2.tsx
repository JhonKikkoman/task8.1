/** @format */

import { useJsonFetch } from './useJsonFetch';

export function Component2() {
  const { error } = useJsonFetch('http://localhost:7070/error');
  return (
    <>
      <span>{`Component2 - ${error?.status}`}</span>
    </>
  );
}
