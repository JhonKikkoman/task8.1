/** @format */

import { useJsonFetch } from './useJsonFetch';

export function Component3() {
  const { loading } = useJsonFetch('http://localhost:7070/loading');
  console.log(loading);
  return <></>;
}
