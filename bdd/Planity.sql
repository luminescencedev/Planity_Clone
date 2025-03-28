------------------------------------------------------------
--        Script Postgre 
------------------------------------------------------------

-- Drop tables if they exist
DROP TABLE IF EXISTS public.Rendez_vous CASCADE;
DROP TABLE IF EXISTS public.Users CASCADE;
DROP TABLE IF EXISTS public.Reviews CASCADE;
DROP TABLE IF EXISTS public.Services CASCADE;
DROP TABLE IF EXISTS public.Salons CASCADE;
DROP TABLE IF EXISTS public.Categories CASCADE;

CREATE SEQUENCE public.Categories_id_category_seq;
CREATE SEQUENCE public.Salons_id_salon_seq;
CREATE SEQUENCE public.Services_id_service_seq;
CREATE SEQUENCE public.Reviews_id_review_seq;
CREATE SEQUENCE public.Users_id_user_seq;
CREATE SEQUENCE public.Rendez_vous_id_rendezvous_seq;

ALTER SEQUENCE public.Categories_id_category_seq RESTART WITH 1;
ALTER SEQUENCE public.Salons_id_salon_seq RESTART WITH 1;
ALTER SEQUENCE public.Services_id_service_seq RESTART WITH 1;
ALTER SEQUENCE public.Reviews_id_review_seq RESTART WITH 1;
ALTER SEQUENCE public.Users_id_user_seq RESTART WITH 1;
ALTER SEQUENCE public.Rendez_vous_id_rendezvous_seq RESTART WITH 1;

------------------------------------------------------------
-- Table: Categories
------------------------------------------------------------
CREATE TABLE public.Categories(
    id_category   SERIAL NOT NULL,
    name          VARCHAR (50) NOT NULL UNIQUE,
    picture       VARCHAR (2000) NOT NULL,
    description   VARCHAR (2000) NOT NULL,
    created_at    DATE NOT NULL,
    updated_at    DATE NOT NULL,
    CONSTRAINT Categories_PK PRIMARY KEY (id_category)
)WITHOUT OIDS;

-- Insert data into Categories
INSERT INTO public.Categories (name, picture, description, created_at, updated_at)
VALUES
('Coiffeur', 'url_to_image', 'Description de la catégorie Coiffeur', current_date, current_date),
('Barbier', 'url_to_image', 'Description de la catégorie Barbier', current_date, current_date),
('Manucure', 'url_to_image', 'Description de la catégorie Manucure', current_date, current_date);

------------------------------------------------------------
-- Table: Salons
------------------------------------------------------------
CREATE TABLE public.Salons(
    id_salon      SERIAL NOT NULL,
    name          VARCHAR (50) NOT NULL UNIQUE,
    adress        VARCHAR (50) NOT NULL,
    zip           VARCHAR (10) NOT NULL,
    picture       VARCHAR (2000) NOT NULL,
    description   VARCHAR (2000) NOT NULL,
    created_at    DATE NOT NULL,
    updated_at    DATE NOT NULL,
    id_category   INT NOT NULL,
    CONSTRAINT Salons_PK PRIMARY KEY (id_salon),
    CONSTRAINT Salons_Categories_FK FOREIGN KEY (id_category) REFERENCES public.Categories(id_category)
)WITHOUT OIDS;

-- Insert data into Salons
INSERT INTO public.Salons (name, adress, zip, picture, description, created_at, updated_at, id_category)
VALUES
('Salon de Paris', '123 Rue de Paris', '75000', 'url_to_image', 'Description du salon de Paris', current_date, current_date, 1),
('Salon de Lyon', '456 Rue de Lyon', '69000', 'url_to_image', 'Description du salon de Lyon', current_date, current_date, 2);

------------------------------------------------------------
-- Table: Services
------------------------------------------------------------
CREATE TABLE public.Services(
    id_service    SERIAL NOT NULL,
    price         DECIMAL (10,2) NOT NULL,
    time          INT NOT NULL,
    description   VARCHAR (2000) NOT NULL,
    created_at    DATE NOT NULL,
    updated_at    DATE NOT NULL,
    id_salon      INT NOT NULL,
    CONSTRAINT Services_PK PRIMARY KEY (id_service),
    CONSTRAINT Services_Salons_FK FOREIGN KEY (id_salon) REFERENCES public.Salons(id_salon)
)WITHOUT OIDS;

-- Insert data into Services
INSERT INTO public.Services (price, time, description, created_at, updated_at, id_salon)
VALUES
(30.00, 60, 'Coupe de cheveux', current_date, current_date, 1),
(20.00, 45, 'Rasage de barbe', current_date, current_date, 2);

------------------------------------------------------------
-- Table: Reviews
------------------------------------------------------------
CREATE TABLE public.Reviews(
    id_review       SERIAL NOT NULL,
    rating        INT NOT NULL,
    description   VARCHAR (2000) NOT NULL,
    created_at    DATE NOT NULL,
    updated_at    DATE NOT NULL,
    id_salon      INT NOT NULL,
    CONSTRAINT reviews_PK PRIMARY KEY (id_review),
    CONSTRAINT reviews_Salons_FK FOREIGN KEY (id_salon) REFERENCES public.Salons(id_salon)
)WITHOUT OIDS;

-- Insert data into reviews
INSERT INTO public.reviews (rating, description, created_at, updated_at, id_salon)
VALUES
(5, 'Excellent service!', current_date, current_date, 1),
(4, 'Très bon mais peut s''améliorer', current_date, current_date, 2);

------------------------------------------------------------
-- Table: Users
------------------------------------------------------------
CREATE TABLE public.Users(
    id_user      SERIAL NOT NULL,
    role         VARCHAR (50) NOT NULL,
    first_name   VARCHAR (50) NOT NULL,
    last_name    VARCHAR (50) NOT NULL,
    age          INT NOT NULL,
    mail         VARCHAR (80) NOT NULL UNIQUE,
    phone        INT NOT NULL UNIQUE,
    zip          VARCHAR (10) NOT NULL,
    password     VARCHAR (255) NOT NULL,
    created_at   DATE NOT NULL,
    updated_at   DATE NOT NULL,
    id_salon     INT,
    CONSTRAINT Users_PK PRIMARY KEY (id_user),
    CONSTRAINT Users_Salons1_FK FOREIGN KEY (id_salon) REFERENCES public.Salons(id_salon)
)WITHOUT OIDS;

-- Insert data into Users
INSERT INTO public.Users (role, first_name, last_name, age, mail, phone, zip, password, created_at, updated_at, id_salon)
VALUES
('Admin', 'John', 'Doe', 30, 'john.doe@example.com', 1234567890, '75000', 'password123', current_date, current_date, 1),
('User', 'Jane', 'Smith', 25, 'jane.smith@example.com', 0987654321, '69000', 'password456', current_date, current_date, 2);

------------------------------------------------------------
-- Table: Rendez_vous
------------------------------------------------------------
CREATE TABLE public.Rendez_vous(
    id_rendezvous   SERIAL NOT NULL,
    date            DATE NOT NULL,
    created_at      DATE NOT NULL,
    updated_at      DATE NOT NULL,
    id_salon        INT NOT NULL,
    id_user         INT NOT NULL,
    CONSTRAINT Rendez_vous_PK PRIMARY KEY (id_rendezvous),
    CONSTRAINT Rendez_vous_Salons_FK FOREIGN KEY (id_salon) REFERENCES public.Salons(id_salon),
    CONSTRAINT Rendez_vous_Users0_FK FOREIGN KEY (id_user) REFERENCES public.Users(id_user)
)WITHOUT OIDS;

-- Insert data into Rendez_vous
INSERT INTO public.Rendez_vous (date, created_at, updated_at, id_salon, id_user)
VALUES
(current_date + interval '1 day', current_date, current_date, 1, 1),
(current_date + interval '2 days', current_date, current_date, 2, 2);
