create database demo;
use demo;

drop table if exists user;
create table user(
  id int not null auto_increment,
  nickname varchar(200)  null,
  account varchar(200)  null,
  password text not null,
  roleId int not null,
  date varchar(200) not null,
  primary key(id)
)DEFAULT CHARSET=UTF8;

insert into user(account,password,nickname,roleId) values ("admin","4QrcOUm6Wau+VuBX8g+IPg==","SuperMan",2);

drop table if exists roles;
create table roles(
  id int not null,
  name varchar(200) not null,
  date varchar(200) not null,
  primary key(id)
)DEFAULT CHARSET=UTF8;

insert roles(id,name,date) values(0,"注册用户","2017-07-06 12:12:12");
insert roles(id,name,date) values(1,"管理员","2017-07-06 12:12:12");
insert roles(id,name,date) values(2,"超级管理员","2017-07-06 12:12:12");


user  id,nickname,accout,openid,password,roleId,level,level_date,date
buy (id,nickname,user,mony,date);
email : id,send,sendpass,receive

booktype (id,typename,groupId);
book(id,name,subtitle,img,description,typeid,resources,follow,date);

send(id,bookid,userid,status,date)

普通用户注册 nickname,account,password,roleId
微信用户注册 nickname,openid,roleId

