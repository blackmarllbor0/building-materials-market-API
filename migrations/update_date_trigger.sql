-- This is a trigger for manual migrations. If you do migrations manually,
-- then you need to run this file-script on the DB server.

-- The script automatically updates the `update_date` field in all
-- tables that have such a field.

DECLARE
	v_table_name varchar(30);
	v_column_exists  integer;
BEGIN
    FOR t IN (SELECT TABLE_NAME FROM all_tables WHERE OWNER = 'BUILDER_MATERIALS_MARKET') LOOP
        v_table_name := t.TABLE_NAME;

		SELECT COUNT(*) INTO v_column_exists
			FROM USER_TAB_COLUMNS
		WHERE TABLE_NAME = v_table_name
			AND COLUMN_NAME = 'UPDATE_DATE';

		IF v_column_exists > 0 THEN
			EXECUTE IMMEDIATE '
	            CREATE OR REPLACE TRIGGER UpdateDateTrigger_' || v_table_name || '
	            BEFORE UPDATE ON BUILDER_MATERIALS_MARKET."' || v_table_name || '"
	            FOR EACH ROW
	            BEGIN
	                :new.UPDATE_DATE := CURRENT_TIMESTAMP;
	            END;
        	';
        ELSE
        	DBMS_OUTPUT.PUT_LINE('таблица ' || v_table_name || ' не содержит поле update_date');
        	CONTINUE;
        END IF;
    END LOOP;
END;