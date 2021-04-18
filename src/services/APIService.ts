import { COMPANIES } from "../data/companies.data";
import { User } from "../types/types";

export default class APIService {

  // TODO
  // This service contains mock reponses

  static async getCompanies() {
    return COMPANIES;
  }

  static async login(username: string, password: string): Promise<User> {
    const companies = ['coke', 'pepsi'];
    if (companies.includes(username) && password === '123456') {
      return {name: username, isCompany: true}
    } else if (/user[0-9]+/.test(username) && password === '123456') {
      return {name: username, isCompany: false}
    }
    throw new Error('wrong credentials');
  }
}
