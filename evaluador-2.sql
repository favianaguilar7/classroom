-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 24-06-2023 a las 05:20:29
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `evaluador`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividades`
--

CREATE TABLE `actividades` (
  `id_actividad` int(11) NOT NULL,
  `title_actividad` varchar(50) NOT NULL,
  `desc_actividad` varchar(200) NOT NULL,
  `fecha_actividad` date NOT NULL,
  `id_materia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `actividades`
--

INSERT INTO `actividades` (`id_actividad`, `title_actividad`, `desc_actividad`, `fecha_actividad`, `id_materia`) VALUES
(1, 'Matrices', 'Buenas tardes alumnos dentro de la actividad van a investigar que es una matriz y me van a traer ejemplos de las diferentes matrices que encuentren', '2023-06-06', 1),
(2, 'Signos de admiración', 'hacer una investigación de los diferentes tipos de signos de admiración y colocar ejemplos de donde se utilizan', '2023-06-08', 2),
(3, 'perros', 'Perros Perros Perros Perros Perros Perros Perros Perros Perros Perros Perros Perros Perros Perros Perros Perros Perros Perros Perros Perros Perros Perros Perros Perros Perros ', '2023-06-03', 2),
(4, 'inc algo de química', 'investigar como es una investigación científica investigar como es una investigación científica investigar como es una investigación científica ', '2023-06-20', 3),
(5, 'hola', 'presentarse chápales', '2023-06-22', 1),
(6, 'Mundo', 'asados así as d as da sd asd', '2023-06-30', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividad_entregada`
--

CREATE TABLE `actividad_entregada` (
  `id_alumnos` int(11) NOT NULL,
  `id_actividad` int(11) NOT NULL,
  `url_actividad` varchar(500) DEFAULT NULL,
  `retro_actividad` varchar(500) DEFAULT NULL,
  `calificacion_actividad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `actividad_entregada`
--

INSERT INTO `actividad_entregada` (`id_alumnos`, `id_actividad`, `url_actividad`, `retro_actividad`, `calificacion_actividad`) VALUES
(1, 3, 'asddasdasda', 'Si el valor devuelto de operator[] se asigna a const_reference, el objeto de vector no se puede modificar. Si el valor devuelto de operator[] se asigna a una referencia, el objeto vector se puede modificar.', 10),
(1, 4, 'laksnlkdnsakd.com', 'asdasda', 6),
(4, 1, NULL, '', 1),
(1, 1, 'caasdasdasdasdasda.com\r\n', 'asd', 5),
(1, 5, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `id_alumnos` int(11) NOT NULL,
  `name_alumnos` varchar(50) NOT NULL,
  `pass_alumnos` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`id_alumnos`, `name_alumnos`, `pass_alumnos`) VALUES
(1, 'Pedro', 1234),
(4, 'jirafa', 123);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos_materias`
--

CREATE TABLE `alumnos_materias` (
  `id_alumnos` int(11) NOT NULL,
  `id_materia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumnos_materias`
--

INSERT INTO `alumnos_materias` (`id_alumnos`, `id_materia`) VALUES
(1, 1),
(1, 2),
(4, 1),
(1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE `materias` (
  `id_materia` int(11) NOT NULL,
  `name_materia` varchar(50) NOT NULL,
  `id_profe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materias`
--

INSERT INTO `materias` (`id_materia`, `name_materia`, `id_profe`) VALUES
(1, 'Matematicas', 1),
(2, 'Español', 6),
(3, 'Química', 1),
(8, 'prueba', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profe`
--

CREATE TABLE `profe` (
  `id_profe` int(11) NOT NULL,
  `name_profe` varchar(50) NOT NULL,
  `pass_profe` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profe`
--

INSERT INTO `profe` (`id_profe`, `name_profe`, `pass_profe`) VALUES
(1, 'Juan', '1234'),
(6, 'pancho', '123');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD PRIMARY KEY (`id_actividad`);

--
-- Indices de la tabla `actividad_entregada`
--
ALTER TABLE `actividad_entregada`
  ADD KEY `id_alumno` (`id_alumnos`,`id_actividad`),
  ADD KEY `id_actividad` (`id_actividad`);

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`id_alumnos`);

--
-- Indices de la tabla `materias`
--
ALTER TABLE `materias`
  ADD PRIMARY KEY (`id_materia`);

--
-- Indices de la tabla `profe`
--
ALTER TABLE `profe`
  ADD PRIMARY KEY (`id_profe`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividades`
--
ALTER TABLE `actividades`
  MODIFY `id_actividad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `id_alumnos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `materias`
--
ALTER TABLE `materias`
  MODIFY `id_materia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `profe`
--
ALTER TABLE `profe`
  MODIFY `id_profe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD CONSTRAINT `actividades_ibfk_1` FOREIGN KEY (`id_materia`) REFERENCES `materias` (`id_materia`);

--
-- Filtros para la tabla `actividad_entregada`
--
ALTER TABLE `actividad_entregada`
  ADD CONSTRAINT `actividad_entregada_ibfk_1` FOREIGN KEY (`id_actividad`) REFERENCES `actividades` (`id_actividad`),
  ADD CONSTRAINT `actividad_entregada_ibfk_2` FOREIGN KEY (`id_alumnos`) REFERENCES `alumnos` (`id_alumnos`);

--
-- Filtros para la tabla `alumnos_materias`
--
ALTER TABLE `alumnos_materias`
  ADD CONSTRAINT `alumnos_materias_ibfk_1` FOREIGN KEY (`id_alumnos`) REFERENCES `alumnos` (`id_alumnos`),
  ADD CONSTRAINT `alumnos_materias_ibfk_2` FOREIGN KEY (`id_materia`) REFERENCES `materias` (`id_materia`);

--
-- Filtros para la tabla `materias`
--
ALTER TABLE `materias`
  ADD CONSTRAINT `materias_ibfk_1` FOREIGN KEY (`id_profe`) REFERENCES `profe` (`id_profe`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
