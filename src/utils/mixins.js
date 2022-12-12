import moment from 'moment'
import Swal from 'sweetalert2'

export const fromNowFilter = {
  filters: {
    fromNow (datetime) {
      return datetime ? moment(datetime).fromNow() : '-'
    }
  }
}

export const emptyImageFilter = {
  filters: {
    emptyImage (src) {
      return src || 'https://fakeimg.pl/350x220/DFDFDF/?text=No+Image'
    }
  }
}


export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})

//存token
export const setToken = (token) => {
  localStorage.setItem('TOKEN', token)
}
// 獲取token
export const getToken = () =>{
  return localStorage.getItem('TOKEN')
}
//移除token
export const removeToken =()=>{
  localStorage.removeItem('TOKEN')
}