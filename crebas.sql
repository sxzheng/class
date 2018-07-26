/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2018/7/19 15:51:47                            */
/*==============================================================*/


drop table if exists choose_course;

drop table if exists create_course;

drop table if exists course;

drop table if exists course_file;

drop table if exists course_report;

drop table if exists message;

drop table if exists common_message;

drop table if exists notice;

drop table if exists excuse;

drop table if exists schedule;

drop table if exists sign;

drop table if exists user;


/*==============================================================*/
/* Table: choose_course                                         */
/*==============================================================*/
create table choose_course
(
   id                   int not null auto_increment,
   student_id           varchar(28),
   course_id            varchar(28),
   primary key (id)
);

/*==============================================================*/
/* Table: create_course                                         */
/*==============================================================*/
create table create_course
(
   id                   int not null auto_increment,
   teacher_id           varchar(28),
   course_id            varchar(20),
   primary key (id)
);

/*==============================================================*/
/* Table: course                                                */
/*==============================================================*/
create table course
(
   id                   int not null auto_increment,
   name                 varchar(50),
   image_url             varchar(20),
   week_day             varchar(10),
   time                 varchar(20),
   start_date           datetime,
   end_date             datetime,
   total_period         int,
   location             varchar(20),
   primary key (id)
);

/*==============================================================*/
/* Table: course_file                                           */
/*==============================================================*/
create table course_file
(
   id                   int not null auto_increment,
   course_id            int,
   name                 varchar(50),
   type                 int,
   url                  varchar(30),
   detail               TINYTEXT,
   time                 datetime,
   primary key (id)
);

/*==============================================================*/
/* Table: course_report                                         */
/*==============================================================*/
create table course_report
(
   id                   int not null auto_increment,
   course_id            int,
   student_id           varchar(28),
   state                int,
   time                 datetime,
   primary key (id)
);




/*==============================================================*/
/* Table: message                                               */
/*==============================================================*/
create table message
(
   id                   int not null auto_increment,
   user_id              varchar(28),
   day                 date,
   time                 varchar(20),
   theme                varchar(50),
   contentId             int,
   contentType          int,
   state               int not null default '1',
   primary key (id)
);

/*==============================================================*/
/* Table: common_message                                        */
/*==============================================================*/
create table common_message
(
   id                   int not null auto_increment,
   content              tinytext,
   primary key (id)
);

/*==============================================================*/
/* Table: notice                                                */
/*==============================================================*/
create table notice
(
   id                   int not null auto_increment,
   course_id            int,
   course_name          varchar(50),
   day                 date,
   location                varchar(50),
   detail               tinytext,
   primary key (id)
);

/*==============================================================*/
/* Table: excuse                                               */
/*==============================================================*/
create table excuse
(
   id                   int not null auto_increment,
   student_id           varchar(28),
   course_id            int,
   day                 date,
   reason               tinytext,
   state                int,
   primary key (id)
);

/*==============================================================*/
/* Table: schedule                                              */
/*==============================================================*/
create table schedule
(
   id                   int not null auto_increment,
   user_id             varchar(28),
   theme                varchar(50),
   location             varchar(50),
   day                 date,
   time                 varchar(20),
   detail               tinytext,
   is_inform            bool,
   inform_time          time,
   primary key (id)
);

/*==============================================================*/
/* Table: sign                                                  */
/*==============================================================*/
create table sign
(
   id                   int not null auto_increment,
   day                 date,
   course_id            int,
   course_name          varchar(50),
   start_time           time,
   end_time             time,
   location             varchar(50),
   number_signed        int,
   total                int,
   primary key (id)
);

/*==============================================================*/
/* Table: user                                              */
/*==============================================================*/
create table user
(
   id                   varchar(28) not null,
   name                 varchar(50),
   school               varchar(50),
   school_number        varchar(15),
   identity             int,
   primary key (id)
);
