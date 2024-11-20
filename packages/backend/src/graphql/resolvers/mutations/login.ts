import { User } from '../../../models/User'
import bcrypt from 'bcrypt'

export const login = async (_parent, args, _context, _info) => {
    const { email, password } = args

    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('User not found')
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
        throw new Error('Invalid password')
    }
    return user
}