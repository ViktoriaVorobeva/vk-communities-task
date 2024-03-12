import { GetGroupsResponse } from "../types";
import { DELAY } from "./constants";
import { mocks } from "./groups";

const ZERORESULT: GetGroupsResponse = {
  result: 0,
};

const MOCKSRESULT: GetGroupsResponse = {
  result: 1,
  data: mocks,
};

const WITHOUTDATA: GetGroupsResponse = {
  result: 1,
};

const variants = [ZERORESULT, MOCKSRESULT, WITHOUTDATA];

export const fetcher = (): Promise<GetGroupsResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * 4);
      if (randomIdx === 3) {
        reject("error");
      }
      resolve(variants[randomIdx]);
    }, DELAY);
  });
};

export const request = (): Promise<GetGroupsResponse> => {
  return fetcher()
    .then((response) => {
      if (response.result === 0) {
        console.log('zero')
        throw new Error("zero result");
      }

      if (!response.data) {
        console.log('not found data')
        throw new Error("not found data");
      }
      return response;
    })
    .catch((reason) => {
      console.log('other')
      throw new Error(reason);
    });
};
