import { green } from '@mui/material/colors';
import React from 'react';
import { useSearch } from '../../context/SearchContext';

const TextSearchable = ({ columnName }) => {

    const { searchValue } = useSearch()
    const colorText = green[700];

    return (
        <span>
            {columnName.toLowerCase().includes(searchValue.toLowerCase()) ? (
                <span>
                    {columnName.split(new RegExp(`(${searchValue.toLowerCase()})`, 'i')).map((part, index) => (
                        part.toLowerCase() === searchValue.toLowerCase() ? (
                            <span key={index} style={{ background: colorText, color: 'white', }}>
                                {part}
                            </span>
                        ) : (
                            <span key={index}>{part}</span>
                        )
                    ))}
                </span>
            ) : (
                columnName
            )}
        </span>
    )
}

export default TextSearchable