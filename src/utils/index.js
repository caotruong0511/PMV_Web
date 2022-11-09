class AS {
  async getItem(key) {
    try {
      const result = await localStorage.getItem(key);
      if (result) {
        return JSON.parse(result);
      }
      return null;
    } catch (error) {}
  }

  async setItem(key, value) {
    try {
      await localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {}
  }

  async updateObj(key, callback) {
    try {
      const obj = await localStorage.getItem(key);
      if (obj) {
        const newObj = callback(JSON.parse(obj));
        await localStorage.setItem(key, JSON.stringify(newObj));
      }
    } catch (error) {}
  }
}

export const as = new AS();
