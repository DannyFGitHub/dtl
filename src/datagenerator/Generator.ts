import { fakerEN_AU as faker } from "@faker-js/faker";
import { DataInstance } from "./types";

export function GenerateAllNominalData({
  recordCount,
  minUnique,
  maxUnique,
  seed,
}: {
  recordCount: number;
  minUnique: number;
  maxUnique: number;
  seed?: number | undefined;
}): DataInstance[] {
  if (seed !== undefined) {
    faker.seed(seed);
  }

  let keysAndFaker: {
    attr: string;
    faker: (
      options?: { abbreviated?: boolean | undefined } | undefined
    ) => string;
    list: string[];
  }[] = [
    { attr: "sex", faker: faker.person.sex, list: [] as string[] },
    { attr: "state", faker: faker.location.state, list: [] as string[] },
    { attr: "favColor", faker: faker.color.human, list: [] as string[] },
    { attr: "favMusicGenre", faker: faker.music.genre, list: [] as string[] },
    { attr: "favAnimal", faker: faker.animal.type, list: [] as string[] },
    { attr: "jobArea", faker: faker.person.jobArea, list: [] as string[] },
  ];

  // Generate Lists:
  keysAndFaker = keysAndFaker.map((keyAndFaker) => {
    return {
      ...keyAndFaker,
      list: faker.helpers.arrayElements(
        faker.helpers.uniqueArray(keyAndFaker.faker, maxUnique),
        {
          min: minUnique,
          max: maxUnique,
        }
      ),
    };
  });

  const dataToReturn = [];
  for (let i = 0; i < recordCount; i++) {
    let currObj: { [key: string]: string } = {};

    keysAndFaker.forEach((keyAndFaker) => {
      currObj[keyAndFaker.attr] = faker.helpers.arrayElement(keyAndFaker.list);
    });

    dataToReturn.push(currObj);
  }
  return dataToReturn;
}
