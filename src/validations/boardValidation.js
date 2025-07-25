import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  /**
   * Note: Mặc định chúng ta không cần phải custom message ở phía BE làm gì vì để cho phía Front-end tự validation và custom mess phía FE cho đẹp.
   * Back-end chỉ cần validation Đảm bảo dữ liệu chuẩn xác, và trả về message mặc định từ thư viện là được.
   * Quan trọng: Việc validation dữ liệu là BẮT BUỘC phải có ở phía Back-end vì đây là diểm cuối để lưu trữ dữ liệu vào DataBase.
   * Và thông thường trong thực tế, điều tốt nhất cho hệ thống là hãy luôn validate dữ liệu ở cả Back-end và Front-end.
   */
  // .message({...}) custom error message với Joi
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().message({
      "any.required": "{{#label}} is required!!",
      'string.min': '{{#label}} length must be at least {{#limit}} characters long',
      'string.max': '{{#label}} length must be less than or equal to {{#limit}} characters long',
      'string.empty': '{{#label}} is not allowed to be empty',
      'string.trim': '{{#label}} must not have leading or trailing whitespace'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    console.log('req.body: ', req.body)
    // abortEarly: false để show ra tất cả các lỗi validation gặp phải. 
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // Validation dữ liệu xong xuôi hợp lệ thì cho request đi tiếp sang Controller
    next()
  } catch (error) {
    // const errorMessage = new Error(error).message
    // const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    // next(customError)
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }

}

export const boardValidation = {
  createNew
}