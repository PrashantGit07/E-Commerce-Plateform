import bcrypt from 'bcrypt';


export const hashPassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 7);
        return passwordHash
    }
    catch (e) {
        console.log(e);
    }
}

export const ComparePassword = async (password, passwordHash) => {
    try {
        return await bcrypt.compare(password, passwordHash)
    }
    catch (e) {
        console.log(e);
    }
}