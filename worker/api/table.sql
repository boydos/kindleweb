create database if exists demo;
use demo;

drop table if exists user;
create table user(
  id int not null auto_increment,
  nickname varchar(200)  null,
  account varchar(200)  null,
  password text not null,
  roleId int not null,
  level int not null,
  levelDate varchar(20) not null,
  date varchar(20) not null,
  primary key(id)
)DEFAULT CHARSET=UTF8;

insert into user(account,password,nickname,roleId,level,levelDate,date) values ("admin","4QrcOUm6Wau+VuBX8g+IPg==","SuperMan",2,3,"2017-07-19 18:09:09","2017-07-19 18:09:09");
select * from user;

drop table if exists roles;
create table roles(
  id int not null,
  name varchar(200) not null,
  date varchar(20) not null,
  primary key(id)
)DEFAULT CHARSET=UTF8;

insert roles(id,name,date) values(0,"普通用户","2017-07-06 12:12:12");
insert roles(id,name,date) values(1,"微信用户","2017-07-06 12:12:12");
insert roles(id,name,date) values(2,"管理员","2017-07-06 12:12:12");
insert roles(id,name,date) values(3,"超级管理员","2017-07-06 12:12:12");

select * from roles;

drop table if exists booktype;
create table booktype(
  id int not null auto_increment,
  name varchar(200) not null,
  groupId int not null,
  date varchar(20) not null,
  primary key(id)
)DEFAULT CHARSET=UTF8;

select * from booktype;

drop table if exists book;
create table book(
  id int not null auto_increment,
  name varchar(200) not null,
  subtitle varchar(200) not null,
  img varchar(200) not null,
  description varchar(500) not null,
  author varchar(200) not null,
  typeId int not null,
  resources varchar(200) not null,
  follow int not null,
  date varchar(20) not null,
  primary key(id)
)DEFAULT CHARSET=UTF8;

select * from book;
user  id,nickname,accout,password,roleId,level,level_date,date
buy (id,nickname,user,mony,date);
email : id,send,sendpass,receive


booktype (id,name,groupId);
book(id,name,subtitle,img,description,typeid,resources,follow,date);

send(id,bookid,userid,status,date)

普通用户注册 nickname,account,password,roleId
微信用户注册 nickname,account,roleId

