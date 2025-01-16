import { useState } from 'react';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import locale from 'antd/locale/ru_RU';

import { Button, ConfigProvider, DatePicker,  Space,  Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { DollarCircleFilled } from '@ant-design/icons';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    city: string;
    salary: number;
}

dayjs.locale('ru-RU');

const dateFormat = 'DD.MM.YYYY';
const { RangePicker } = DatePicker;

const MainPage = () => {
	const [ period, setPeriod ] = useState<string | string[]>();

	const onChange = (_: Dayjs | (Dayjs | null)[] | null, dateString: string | string[]) => {
		console.log(_, dateString)
		setPeriod(dateString);
	};

    const columns: TableColumnsType<DataType> = [
        {
          title: 'Имя',
          dataIndex: 'name',
          key: 'name',
		  width: 350,
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Возраст',
          dataIndex: 'age',
          key: 'age',
          width: 90,
		  sorter: (a, b) => a.age - b.age,
        },
        {
          title: 'Дата рождения',
          dataIndex: 'birthday',
          key: 'birthday',
          ellipsis: true,
          width: 150,
        },
        {
          title: 'Город',
          dataIndex: 'city',
          key: 'city',
          ellipsis: true,
        },
        {
          title: <>Зарплата <DollarCircleFilled /></>,
          dataIndex: 'salary',
          key: 'salary',
          ellipsis: true,
		  width: 150,
        },
        {
          title: 'Дата начала работы',
          dataIndex: 'dateStart',
          key: 'dateStart',
          ellipsis: true,
		  width: 150,
        },
        {
          title: 'Дата завершения работы',
          dataIndex: 'dateEnd',
          key: 'dateEnd',
          ellipsis: true,
		  width: 150,
        },
      ];
      
    const data = [
        {
          key: '1',
          name: 'Дерябин Роман',
          age: 38,
          city: 'Tomsk',
          birthday: '01.01.1986',
          salary: 2000,
		  dateStart: '01.01.2019',
		  dateEnd: null,
        },
        {
          key: '2',
          name: 'John Doe',
          age: 29,
          city: 'New York',
          birthday: '23.01.1995',
          salary: 5000,
		  dateStart: '01.01.2020',
		  dateEnd: '01.01.2020',
        },
        {
          key: '3',
          name: 'Jim Burton',
          age: 26,
          city: 'Los Angeles',
          birthday: '13.06.1998',
          salary: 4000,
		  dateStart: '01.01.2024',
		  dateEnd: '01.01.2024',
        },
        {
          key: '4',
          name: 'Garald Black',
          age: 35,
          city: 'Las Vegas',
          birthday: '13.07.1989',
          salary: 6000,
		  dateStart: '01.01.2025',
		  dateEnd: null,
        },
        {
          key: '5',
          name: 'Ivan Ivanov',
          age: 36,
          city: 'Moskow',
          birthday: '13.04.1988',
          salary: 6000,
		  dateStart: '01.01.2025',
		  dateEnd: null,
        },
    ];

    return (
		<>
			<ConfigProvider locale={locale}>
    			<div style={{ marginBottom: 4 }}>Выбрать период работы в организации:</div> 
				<Space.Compact block>
					<RangePicker format={dateFormat} style={{ marginBottom: 10 }} onChange={onChange} />
					<Button type="primary">Сформировать отчет</Button>
				</Space.Compact>
			</ConfigProvider>

			<Table<DataType> 
				columns={columns} 
				dataSource={data}
				scroll={{x: 800}}
			/>
		</>
	);
}

export default MainPage