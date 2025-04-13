export const unpackPrams = (values: any[]) => {
    let params: string = '?'
    Object.keys(values).forEach((key: string) => {
        params = `${key}=${values[key as keyof typeof values]}&`
    })
    return params.slice(0, params.length)
}