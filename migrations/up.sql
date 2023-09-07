CREATE TABLE "user_role" (
	id integer PRIMARY KEY,
	name varchar(50) NOT NULL UNIQUE,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp
);

CREATE TABLE "user_status" (
	id integer PRIMARY KEY,
	name varchar(50) NOT NULL UNIQUE,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp
);

CREATE TABLE "user" (
	id integer PRIMARY KEY,
	user_role_id integer NOT NULL,
	user_status_id integer NOT NULL,
	name varchar(50) NOT NULL,
	email varchar(50) NOT NULL UNIQUE,
	phone_number varchar(15) NOT NULL UNIQUE,
	password_hash varchar(255) NOT NULL UNIQUE,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp,

	CONSTRAINT ur_u_fk FOREIGN KEY ( user_role_id ) REFERENCES "user_role" ( id ),
	CONSTRAINT us_u_fk FOREIGN KEY ( user_status_id ) REFERENCES "user_status" ( id )
);

CREATE TABLE "session" (
	id integer PRIMARY KEY,
	user_id integer NOT NULL,
	token varchar(255) NOT NULL UNIQUE,
	live_time timestamp NOT NULL,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp,

	CONSTRAINT u_s_fk FOREIGN KEY ( user_id ) REFERENCES "user" ( id )
);

CREATE TABLE "auth_audit_event" (
	id integer PRIMARY KEY,
	name varchar(50) NOT NULL UNIQUE,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp
);

CREATE TABLE "auth_audit" (
	id integer PRIMARY KEY,
	user_id integer NOT NULL,
	auth_audit_event_id integer NOT NULL,
	session_id integer NOT NULL,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp,

	CONSTRAINT u_aa_fk FOREIGN KEY ( user_id ) REFERENCES "user" ( id ),
	CONSTRAINT aae_aa_fk FOREIGN KEY ( auth_audit_event_id ) REFERENCES "auth_audit_event" ( id ),
	CONSTRAINT s_aa_fk FOREIGN KEY ( session_id ) REFERENCES "session" ( id )
);

CREATE TABLE "order_payment_type" (
	id integer PRIMARY KEY,
	name varchar(50) NOT NULL UNIQUE,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp
);

CREATE TABLE "order_status" (
	id integer PRIMARY KEY,
	code integer NOT NULL UNIQUE,
	name varchar(50) NOT NULL UNIQUE,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp
);

CREATE TABLE "order" (
	id integer PRIMARY KEY,
	user_id integer NOT NULL,
	order_status_id integer NOT NULL,
	order_payment_type_id NOT NULL,
	order_number integer NOT NULL,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp,

	CONSTRAINT u_o_fk FOREIGN KEY ( user_id ) REFERENCES "user" ( id ),
	CONSTRAINT os_o_fk FOREIGN KEY ( order_status_id ) REFERENCES "order_status" ( id ),
	CONSTRAINT opt_o_fk FOREIGN KEY ( order_payment_type_id ) REFERENCES "order_payment_type" ( id )
);

CREATE TABLE "delivery" (
	id integer PRIMARY KEY,
	order_id integer NOT NULL,
	ammount decimal NOT NULL,
	address_from varchar(255) NOT NULL,
	address_to varchar(255) NOT NULL,
	approximate_date timestamp NOT NULL,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp,

	CONSTRAINT o_d_fk FOREIGN KEY ( order_id ) REFERENCES "order" ( id )
);

CREATE TABLE "order_history" (
	id integer PRIMARY KEY,
	order_status_id integer NOT NULL,
	order_id integer NOT NULL,
	total_quantity integer NOT NULL,
	total_cost decimal NOT NULL,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp,

	CONSTRAINT os_oh_fk FOREIGN KEY ( order_status_id ) REFERENCES "order_status" ( id ),
	CONSTRAINT o_oh_fk FOREIGN KEY ( order_id ) REFERENCES "order" ( id )
);

CREATE TABLE "company" (
	id integer PRIMARY KEY,
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
	id integer PRIMARY KEY,
	name varchar(50) NOT NULL UNIQUE,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp
);

CREATE TABLE "product" (
	id integer PRIMARY KEY,
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

	CONSTRAINT cp_p_fk FOREIGN KEY ( company_id ) REFERENCES "company" ( id ),
	CONSTRAINT ct_p_fk FOREIGN KEY ( category_id ) REFERENCES "category" ( id )
);

CREATE TABLE "feedback" (
	id integer PRIMARY KEY,
	user_id integer NOT NULL,
	product_id integer NOT NULL,
	company_id integer NOT NULL,
	rating decimal DEFAULT 5,
	title varchar(125) NOT NULL,
	message varchar2(1000) NOT NULL,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp,

	CONSTRAINT u_f_fk FOREIGN KEY ( user_id ) REFERENCES "user" ( id ),
	CONSTRAINT p_f_fk FOREIGN KEY ( product_id ) REFERENCES "product" ( id ),
	CONSTRAINT c_f_fk FOREIGN KEY ( company_id ) REFERENCES "company" ( id )
);

CREATE TABLE "order_detail" (
	id integer PRIMARY KEY,
	order_id integer NOT NULL,
	product_id integer NOT NULL,
	isDeleted number(1) DEFAULT 0,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP,
	update_date timestamp,

	CONSTRAINT o_od_fk FOREIGN KEY ( order_id ) REFERENCES "order" ( id ),
	CONSTRAINT p_od_fk FOREIGN KEY ( product_id ) REFERENCES "product" ( id )
);