import jwt from 'jsonwebtoken'

export default function discriToken() {
  const token = localStorage.getItem('token')
  const decoded = jwt.verify(token, 'cbb5b40302212460356ea0fbf452d0cf')
  return decoded
}
