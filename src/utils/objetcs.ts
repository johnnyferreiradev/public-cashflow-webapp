type AnyObject = Record<string, any>;

export const removeObjectProps = (
  object: AnyObject,
  propsToRemove: string[],
) => {
  const newObject: AnyObject = { ...object };

  propsToRemove.forEach((prop) => {
    delete newObject[prop];
  });

  return newObject;
};
