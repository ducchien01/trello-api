import { slugify } from "~/utils/formatters"

const creteNew = async (reqBody) => {
  try {
    // Xử lý logic dữ liệu tuỳ đặc thù dự án

    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Gọi tới tầng Model để xử lý lưu bản ghi newBoard vào trong DataBase
    // ...

    // Làm thêm các xử lý logic khác với các Collection khác tuỳ theo đặc thù dự án...vv
    // Bắn email, notification về cho admin khi có 1 board mới được tạo...v
    
    // Trả kết quả về, trong Service luôn phải có return
    return newBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  creteNew
}