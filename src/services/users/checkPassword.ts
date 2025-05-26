import bcrypt from "bcrypt";

export async function checkPassword(password: string, password_encrypted: string) : Promise<boolean> {
    console.log(password, password_encrypted)
    const check_password = await bcrypt.compare(password, password_encrypted);
    console.log(check_password)
    return check_password;
}