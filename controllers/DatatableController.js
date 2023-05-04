const db = require("../models/index");
const { Sequelize, Op, QueryTypes, Model } = require("sequelize");

const Users = db.Users;
const Posts = db.Posts;

const getAllUsers = async (request, res) => {
  try {
    const { draw, start, length, order } = request.query;

    let column_name,
      column_sort_order,
      search_value,
      totalRecord,
      responceData,
      queryData,
      column_index,
      searchResult;
    let orderData = [];
    let data_arr = [];

    if (typeof order == "undefined") {
      column_name = "id";
      column_sort_order = "ASC";
      orderData.push([column_name, column_sort_order]);
    } else {
      column_index = request.query.order[0]["column"];
      column_name = request.query.columns[column_index]["data"];
      column_sort_order = request.query.order[0]["dir"];

      if (column_name.indexOf(".") == "-1") {
        orderData.push([column_name, column_sort_order]);
      } else {
        orderData.push([
          column_name.split(".")[0],
          column_name.split(".")[1],
          column_sort_order,
        ]);
      }
    }

    search_value = request.query.search["value"];
    totalRecord = await Users.count();
    let searchData = {
      [Op.or]: [
        { name: { [Op.like]: "%" + search_value + "%" } },
        { email: { [Op.like]: "%" + search_value + "%" } },
        { gender: { [Op.like]: "%" + search_value + "%" } },
        { "$postdetails.title$": { [Op.like]: "%" + search_value + "%" } },
      ],
    };

    searchResult = await Users.count({
      include: [
        {
          model: Posts,
          as: "postdetails",
        },
      ],
      where: searchData,
    });

    total_records_with_filter = searchResult;

    queryData = await Users.findAll({
      limit: Number(length),
      offset: Number(start),
      include: [
        {
          model: Posts,
          as: "postdetails",
        },
      ],
      order: [orderData],
      where: searchData,
    });

    responceData = {
      draw: draw,
      iTotalRecords: totalRecord,
      iTotalDisplayRecords: searchResult,
      aaData: queryData,
    };
    res.json(responceData);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
};
