


CREATE OR REPLACE PACKAGE pkg_reporte_ventas AS
    PROCEDURE SP_LOG_ERROR(
        p_unidad_responsable IN VARCHAR2,
        p_codigo_oracle      IN VARCHAR2,
        p_descripcion_oracle IN VARCHAR2
    );

    FUNCTION FN_OBTENER_VENTAS(
        p_id_categoria IN NUMBER,
        p_mes_anio     IN VARCHAR2
    ) RETURN NUMBER;

    PROCEDURE SP_INSERTAR_REPORTE(
        p_cod_cat      IN NUMBER,
        p_nom_cat      IN VARCHAR2,
        p_mes_anio     IN VARCHAR2,
        p_total_ventas IN NUMBER
    );

    PROCEDURE SP_GENERAR_REPORTE(
        p_mes_anio IN VARCHAR2
    );
END pkg_reporte_ventas;
/

CREATE OR REPLACE PACKAGE BODY pkg_reporte_ventas AS

    PROCEDURE SP_LOG_ERROR(p_unidad_responsable IN VARCHAR2, p_codigo_oracle IN VARCHAR2, p_descripcion_oracle IN VARCHAR2) IS
        PRAGMA AUTONOMOUS_TRANSACTION;
    BEGIN
        INSERT INTO error_proceso_general (id_error, codigo_oracle, descripcion_oracle, fecha_error, unidad_responsable)
        VALUES (seq_error_a.NEXTVAL, p_codigo_oracle, SUBSTR(p_descripcion_oracle, 1, 250), SYSDATE, p_unidad_responsable);
        COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
            ROLLBACK;
    END SP_LOG_ERROR;

    FUNCTION FN_OBTENER_VENTAS (p_id_categoria IN NUMBER, p_mes_anio IN VARCHAR2) RETURN NUMBER IS
        v_total_ventas NUMBER := 0;
    BEGIN
        SELECT NVL(SUM(dv.cantidad),0)
        INTO v_total_ventas
        FROM detalleventa dv
        JOIN venta v ON dv.id_venta = v.id_venta
        JOIN boleto b ON dv.id_boleto = b.id_boleto
        WHERE b.id_categoria = p_id_categoria
          AND TO_CHAR(v.fecha_venta, 'MM/YYYY') = p_mes_anio;

        RETURN v_total_ventas;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE;
    END FN_OBTENER_VENTAS;

    PROCEDURE SP_INSERTAR_REPORTE (
        p_cod_cat IN NUMBER,
        p_nom_cat IN VARCHAR2,
        p_mes_anio IN VARCHAR2,
        p_total_ventas IN NUMBER
    ) IS
        v_unidad_responsable VARCHAR2(70) := 'PKG_REPORTE_VENTAS.SP_INSERTAR_REPORTE';
    BEGIN
        INSERT INTO reporte_a (codigo_categoria, mes_year_consulta, nombre_categoria, total_ventas)
        VALUES(p_cod_cat, p_mes_anio, p_nom_cat, p_total_ventas);
    EXCEPTION
        WHEN OTHERS THEN
            SP_LOG_ERROR(v_unidad_responsable, SQLCODE, SQLERRM);
    END SP_INSERTAR_REPORTE;

    PROCEDURE SP_GENERAR_REPORTE (p_mes_anio IN VARCHAR2) IS
        v_unidad_responsable VARCHAR2(70) := 'PKG_REPORTE_VENTAS.SP_GENERAR_REPORTE';

        TYPE t_info_categoria IS RECORD (
            id_cat   NUMBER,
            nom_cat  VARCHAR2(100),
            ventas   NUMBER
        );
        v_registro_actual t_info_categoria;

        TYPE t_lista_estados IS VARRAY(3) OF VARCHAR2(20);
        v_estados t_lista_estados := t_lista_estados('Calculado', 'Verificado', 'Auditado');

        CURSOR c_categorias IS
            SELECT id_categoria, nombre_categoria
            FROM categoria_boleto
            ORDER BY nombre_categoria DESC;
    BEGIN
        FOR reg IN c_categorias LOOP
            v_registro_actual.id_cat := reg.id_categoria;
            v_registro_actual.nom_cat := reg.nombre_categoria;
            v_registro_actual.ventas := FN_OBTENER_VENTAS(reg.id_categoria, p_mes_anio);

            SP_INSERTAR_REPORTE (
                v_registro_actual.id_cat,
                v_registro_actual.nom_cat,
                p_mes_anio,
                v_registro_actual.ventas
            );

            FOR i IN 1..v_estados.COUNT LOOP
                DBMS_OUTPUT.PUT_LINE('Categoria: ' || v_registro_actual.nom_cat || ' - Estado: ' || v_estados(i));
            END LOOP;
        END LOOP;

        COMMIT;
        DBMS_OUTPUT.PUT_LINE('Reporte generado exitosamente para ' || p_mes_anio);
    EXCEPTION
        WHEN OTHERS THEN
            ROLLBACK;
            SP_LOG_ERROR(v_unidad_responsable, SQLCODE, SQLERRM);
            RAISE_APPLICATION_ERROR(-20001, 'Error al generar reporte: ' || SQLERRM);
    END SP_GENERAR_REPORTE;

END pkg_reporte_ventas;
/