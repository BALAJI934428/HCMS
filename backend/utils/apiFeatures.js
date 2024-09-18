class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const key = Number(this.queryStr.keyword);

    if (key) {
      let keyword = this.queryStr.keyword
        ? {
            id: {
              $regex: this.queryStr.keyword,
            },
          }
        : {};
      this.query.find({ ...keyword });
      return this;
    } else {
      let keyword = this.queryStr.keyword
        ? {
            $or: [
              { name: { $regex: this.queryStr.keyword, $options: "i" } },
              { email: { $regex: this.queryStr.keyword, $options: "i" } },
            ],
          }
        : {};
      this.query.find({ ...keyword });
      return this;
    }
  }
  doctorSearch() {
    let keyword = this.queryStr.doctor
      ? {
          $or: [
            { name: { $regex: this.queryStr.keyword, $options: "i" } },
            { email: { $regex: this.queryStr.keyword, $options: "i" } },
          ],
        }
      : {};
    this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryStrCopy = { ...this.queryStr };

    //removing fields from query
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((field) => delete queryStrCopy[field]);
    this.query.find(queryStrCopy);
    return this;
  }
}
module.exports = APIFeatures;
