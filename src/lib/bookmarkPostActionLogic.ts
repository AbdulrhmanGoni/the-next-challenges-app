import { SetStateAction } from "react";

type UserDataState = { userData: User } | undefined;

export default function bookmarkPostActionLogic(
  postId: Post["id"]
): SetStateAction<UserDataState> {
  return (data) => {
    if (data?.userData) {
      return {
        userData: {
          ...data.userData,
          bookmarks: toogleIdInArray(data.userData.bookmarks, postId),
        },
      };
    }
    return;
  };
}

function toogleIdInArray(array: string[], target: string) {
  if (!array.length) {
    return [target];
  }

  const updatedArray: string[] = [];
  let targetExist = false;

  for (let i = 0; i < array.length; i++) {
    const str = array[i];
    if (target === str) {
      targetExist = true;
    } else {
      updatedArray.push(str);
    }

    if (i === array.length - 1 && !targetExist) {
      updatedArray.push(target);
    }
  }

  return updatedArray;
}
