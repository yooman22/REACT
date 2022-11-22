import * as yup from 'yup'

const getValidationSchema = (fields: any[]) => {
  const schema = fields.reduce((schema, field) => {
    const { name, validationType, validationTypeError, validations = [] } = field
    const isObject = name.indexOf('.') >= 0
    const Yup = yup as Record<any, any>
    if (!Yup[validationType]) {
      return schema
    }
    let validator = Yup[validationType]().typeError(validationTypeError || '')
    validations.forEach((validation: { params: any; type: any }) => {
      const { params, type } = validation
      if (!validator[type]) {
        return
      }
      validator = validator[type](...params)
    })

    if (!isObject) {
      return schema.concat(yup.object().shape({ [name]: validator }))
    }

    const reversePath = name.split('.').reverse()
    const currNestedObject = reversePath.slice(1).reduce(
      (yupObj: { array: any }, path: number, index: any, source: any) => {
        if (!isNaN(path)) {
          return { array: yup.array().of(yup.object().shape(yupObj)) }
        }
        if (yupObj.array) {
          return { [path]: yupObj.array }
        }
        return { [path]: yup.object().shape(yupObj) }
      },
      { [reversePath[0]]: validator }
    )

    const newSchema = yup.object().shape(currNestedObject)
    return schema.concat(newSchema)
  }, yup.object().shape({}))

  return schema
}

export default getValidationSchema
