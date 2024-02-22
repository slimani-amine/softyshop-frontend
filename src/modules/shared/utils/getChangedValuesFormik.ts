/* eslint-disable @typescript-eslint/no-explicit-any */
export const getChangedValues = (values: any, initialValues: any) => {
  return Object.entries(values).reduce((acc: any, [key, value]) => {
    const hasChanged = initialValues[key] !== value

    if (hasChanged) {
      acc[key] = value
    }

    return acc
  }, {})
}
