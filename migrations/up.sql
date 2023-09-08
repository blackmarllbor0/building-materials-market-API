CREATE TABLE "user_role" (
	id integer GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
	name varchar(50) NOT NULL UNIQUE,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp
);

CREATE TABLE "user_status" (
	id integer GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
	name varchar(50) NOT NULL UNIQUE,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp
);

CREATE TABLE "user" (
	id integer GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
	user_role_id integer NOT NULL,
	user_status_id integer NOT NULL,
	name varchar(50) NOT NULL,
	email varchar(50) NOT NULL UNIQUE,
	phone_number varchar(15) NOT NULL UNIQUE,
	password_hash varchar(255) NOT NULL UNIQUE,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp,

	CONSTRAINT ur_u_fk FOREIGN KEY ( user_role_id ) REFERENCES "user_role" ( id ) ON DELETE CASCADE,
	CONSTRAINT us_u_fk FOREIGN KEY ( user_status_id )
	REFERENCES "user_status" ( id ) ON DELETE CASCADE

);

CREATE TABLE "session" (
	id integer GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
	user_id integer NOT NULL,
	token varchar(255) NOT NULL UNIQUE,
	live_time timestamp NOT NULL,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp,

	CONSTRAINT u_s_fk FOREIGN KEY ( user_id ) REFERENCES "user" ( id ) ON DELETE CASCADE
);

CREATE TABLE "auth_audit_event" (
	id integer GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
	name varchar(50) NOT NULL UNIQUE,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp
);

CREATE TABLE "auth_audit" (
	id integer GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
	user_id integer NOT NULL,
	auth_audit_event_id integer NOT NULL,
	session_id integer NOT NULL,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp,

	CONSTRAINT u_aa_fk FOREIGN KEY ( user_id ) REFERENCES "user" ( id ) ON DELETE CASCADE,
	CONSTRAINT aae_aa_fk FOREIGN KEY ( auth_audit_event_id )
	REFERENCES "auth_audit_event" ( id ) ON DELETE CASCADE,
	CONSTRAINT s_aa_fk FOREIGN KEY ( session_id )  REFERENCES "session" ( id ) ON DELETE CASCADE
);

CREATE TABLE "order_payment_type" (
	id integer GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
	name varchar(50) NOT NULL UNIQUE,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp
);

CREATE TABLE "order_status" (
	id integer GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
	code integer NOT NULL UNIQUE,
	name varchar(50) NOT NULL UNIQUE,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp
);

CREATE TABLE "order" (
	id integer GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
	user_id integer NOT NULL,
	order_status_id integer NOT NULL,
	order_payment_type_id NOT NULL,
	order_number integer NOT NULL,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp,

	CONSTRAINT u_o_fk FOREIGN KEY ( user_id ) REFERENCES "user" ( id ) ON DELETE CASCADE,
	CONSTRAINT os_o_fk FOREIGN KEY ( order_status_id )
	REFERENCES "order_status" ( id ) ON DELETE CASCADE,
	CONSTRAINT opt_o_fk FOREIGN KEY ( order_payment_type_id )
	REFERENCES "order_payment_type" ( id ) ON DELETE CASCADE
);

CREATE TABLE "delivery" (
	id integer GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
	order_id integer NOT NULL,
	ammount decimal NOT NULL,
	address_from varchar(255) NOT NULL,
	address_to varchar(255) NOT NULL,
	approximate_date timestamp NOT NULL,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp,

	CONSTRAINT o_d_fk FOREIGN KEY ( order_id ) REFERENCES "order" ( id ) ON DELETE CASCADE
);

CREATE TABLE "order_history" (
	id integer GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
	order_status_id integer NOT NULL,
	order_id integer NOT NULL,
	total_quantity integer NOT NULL,
	total_cost decimal NOT NULL,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp,

	CONSTRAINT os_oh_fk FOREIGN KEY ( order_status_id )
	REFERENCES "order_status" ( id ) ON DELETE CASCADE,
	CONSTRAINT o_oh_fk FOREIGN KEY ( order_id ) REFERENCES "order" ( id ) ON DELETE CASCADE
);

CREATE TABLE "company" (
	id integer GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
	name varchar(50) NOT NULL UNIQUE,
	link_to_website varchar(255) NOT NULL UNIQUE,
	link_to_logo_image varchar(255) NOT NULL UNIQUE,
	phone_number varchar(15) NOT NULL UNIQUE,
	email varchar(50) NOT NULL UNIQUE,
	description varchar2(1000) NOT NULL,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp
);

CREATE TABLE "category" (
	id integer GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
	name varchar(50) NOT NULL UNIQUE,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp
);

CREATE TABLE "product" (
	id integer GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
	company_id integer NOT NULL,
	category_id integer NOT NULL,
	quantity integer NOT NULL,
	price decimal NOT NULL,
	rating decimal DEFAULT 5,
	link_to_images varchar(255) NOT NULL UNIQUE,
	title varchar(50) NOT NULL,
	description varchar2(1000) NOT NULL,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp,

	CONSTRAINT cp_p_fk FOREIGN KEY ( company_id )
	REFERENCES "company" ( id ) ON DELETE CASCADE,
	CONSTRAINT ct_p_fk FOREIGN KEY ( category_id )
	REFERENCES "category" ( id ) ON DELETE CASCADE
);

CREATE TABLE "feedback" (
	id integer GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
	user_id integer NOT NULL,
	product_id integer NOT NULL,
	company_id integer NOT NULL,
	rating decimal DEFAULT 5,
	title varchar(125) NOT NULL,
	message varchar2(1000) NOT NULL,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp,

	CONSTRAINT u_f_fk FOREIGN KEY ( user_id ) REFERENCES "user" ( id ) ON DELETE CASCADE,
	CONSTRAINT p_f_fk FOREIGN KEY ( product_id ) REFERENCES "product" ( id ) ON DELETE CASCADE,
	CONSTRAINT c_f_fk FOREIGN KEY ( company_id ) REFERENCES "company" ( id ) ON DELETE CASCADE
);

CREATE TABLE "order_detail" (
	id integer GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
	order_id integer NOT NULL,
	product_id integer NOT NULL,
	isDeleted number(1) DEFAULT 0,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp,

	CONSTRAINT o_od_fk FOREIGN KEY ( order_id ) REFERENCES "order" ( id ) ON DELETE CASCADE,
	CONSTRAINT p_od_fk FOREIGN KEY ( product_id ) REFERENCES "product" ( id ) ON DELETE CASCADE
);