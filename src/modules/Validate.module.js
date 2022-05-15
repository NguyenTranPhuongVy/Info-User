const MESSENGER = require('../modules/Messenger.module')
const REGEX = require('../modules/Regex.module')

module.exports.check_email = (email) => {

    if (!REGEX.email_RFC_2822.test(email)) {
        return {
            error: true,
            message: `Email ${MESSENGER.INVALID}`
        }
    }

    return {
        error: false
    }
}

module.exports.check_phone_vn = (phone) => {

    if (phone.length < 10 && phone.length > 11) {
        return {
            error: true,
            message: `Số điện thoại từ 10 đến 11 ký tự!`
        }
    }
    if (!REGEX.phone_vn.test(phone)) {
        return {
            error: true,
            message: `Số điện thoại ${MESSENGER.INVALID}`
        }
    }

    return {
        error: false
    }
}

module.exports.check_coin = (coin) => {

    if (!REGEX.number.test(coin)) return {
        error: true,
        message: `Coin ${MESSENGER.NUMBER}`
    }


    if (coin < 0) return {
        error: true,
        message: `Coin ${MESSENGER.INVALID}`
    }

    return {
        error: false
    }
}


module.exports.check_number = (number, text) => {

    if (!REGEX.number.test(number)) return {
        error: true,
        message: `${text} ${MESSENGER.NUMBER}`
    }

    return {
        error: false
    }
}

module.exports.key = (keyUser, keyAI) => {
    if (keyUser !== keyAI) return {
        error: true,
        message: MESSENGER.NOT_KEY
    }
    return {
        error: false
    }
}

module.exports.not_body = (keyUser, keyAI) => {
    if (keyUser !== keyAI) return {
        error: true,
        message: MESSENGER.NOT_KEY
    }
    return {
        error: false
    }
}

module.exports.check_link = (link, text) => {
    if (!REGEX.url.test(link)) {
        return {
            error: true,
            message: `${text} ${MESSENGER.INVALID}`
        }
    }

    return {
        error: false
    }
}

// Kiểm tra xem có tồn tại hay không
module.exports.check_requiter = (content, text) => {
    if (!content) {
        return {
            error: true,
            message: `${text} ${MESSENGER.NOT_REQUIRE}`
        }
    }

    return {
        error: false
    }
}

//Kiếm tra giới hạn
//! contentLength: Nội dung gửi
//! min: giới hạn nhỏ nhất
//! max: giới hạn lớn nhất
//! name: phân biết nội dung: ký tự, tuổi,...
module.exports.check_length_min_max_string = (contentLength, min, max, text, name) => {
    if (contentLength < min || contentLength > max) {
        return {
            error: true,
            message: `${text} từ ${min} đến ${max} ${name}!`
        }
    }

    return {
        error: false
    }
}

module.exports.check_length_equal_string = (contentLength, numberEqual, text) => {
    if (contentLength != numberEqual) {
        return {
            error: true,
            message: `${text} phải đúng ${numberEqual} ký tự`
        }
    }

    return {
        error: false
    }
}

module.exports.check_number = (content, text) => {
    if (!REGEX.number.test(content)) return {
        error: true,
        message: `${text} ${MESSENGER.NUMBER}`
    }

    return {
        error: false
    }
}

// Kiểm tra năm
//! Năm không vượt quá năm hiện tại
//! Năm trở về trước không quá 200 năm
module.exports.check_year = (year, text) => {
    const yearNow = new Date(Date.now()).getFullYear();

    if (year.length != 4) {
        return {
            error: true,
            message: `${text} phải đúng 4 ký tự`
        }
    }

    if (!REGEX.number.test(year)) {
        return {
            error: true,
            message: `${text} ${MESSENGER.NUMBER}`
        }
    }

    if (year > yearNow) {
        return {
            error: true,
            message: `${text} không vượt năm hiện tại!`
        }
    }

    if (year < yearNow - 200) {
        return {
            error: true,
            message: `${text} trở về quá khứ không vượt quá 200 năm!`
        }
    }

    return {
        error: false
    }
}

//So sánh số a nhỏ hơn số b
module.exports.compare_min = (a, b, text_a, text_b) => {
    console.log(a);
    console.log(b);
    if (a < b) {
        return {
            error: true,
            message: `${text_a} phải nhỏ hơn ${text_b}!`
        }
    }

    return {
        error: false
    }
}

//So sánh số a lơn hơn số b thì sai
module.exports.compare_big = (a, b, text_a, text_b) => {
    if (Number(a) >= Number(b)) {
        return {
            error: true,
            message: `${text_a} phải lớn hơn ${text_b}!`
        }
    }

    return {
        error: false
    }
}

module.exports.check_color_hex = (color) => {
    if (!REGEX.color_hex.test(color)) {
        return {
            error: true,
            message: `Màu sắc ${MESSENGER.INVALID}`
        }
    }

    return {
        error: false
    }
}

module.exports.check_url_image = (image) => {
    if (!REGEX.url_image.test(image)) {
        return {
            error: true,
            message: `Url hình ảnh ${MESSENGER.INVALID}`
        }
    }

    return {
        error: false
    }
}

module.exports.check_gender = (gender) => {
    console.log(gender);
    if (gender != 'Nam' || gender != 'Nữ' || gender != 'Khác') return {
        error: true,
        message: `Giới tính ${MESSENGER.INVALID}`
    }

    return {
        error: false
    }
}