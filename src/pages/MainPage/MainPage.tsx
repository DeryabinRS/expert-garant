import { useState } from 'react';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import locale from 'antd/locale/ru_RU';

import { Button, ConfigProvider, DatePicker,  Space,  Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { DollarCircleFilled } from '@ant-design/icons';

import db from '../../db.json';

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
	const [ period, setPeriod ] = useState<string[]>();
	const [ dataSource, setDataSource ] = useState<any>([]);

	const onChangePeriodDate = (_: Dayjs | (Dayjs | null)[] | null, dateString: string[]) => {
		setPeriod(dateString);
	};

	const handleGetResponse = () => {
		console.log(period);
		const dataSource = db.map(item => ({...item, key: item.id.toString()})).filter(item => {
			if(period && Array.isArray(period)) {
				const dateStart = new Date(period[0]);
				const dateEnd = new Date(period[1]);

				if (dateStart && dateEnd) {
					if (dayjs(dateStart) >= dayjs(item.dateStart)) {
						if (item.dateEnd) {
							return dayjs(dateEnd) <= dayjs(item.dateEnd) && item;
						} else {
							return item;
						}
					}

				} else {
					return item;
				}
			} else {
				return item;
			}
		});

		setDataSource(dataSource)
	}

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

    return (
		<>
			<ConfigProvider locale={locale}>
    			<div style={{ marginBottom: 4 }}>Выбрать период работы в организации:</div> 
				<Space.Compact block>
					<RangePicker format={dateFormat} style={{ marginBottom: 10 }} onChange={onChangePeriodDate} />
					<Button type="primary" onClick={handleGetResponse}>Сформировать отчет</Button>
				</Space.Compact>
			</ConfigProvider>

			<Table<DataType> 
				columns={columns} 
				dataSource={dataSource}
				scroll={{x: 800}}
			/>
		</>
	);
}

export default MainPage