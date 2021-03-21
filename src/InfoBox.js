import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core'
import './InfoBox.css';

function InfoBox( {title, cases, total, active, isRed, ...props}) {
    return (
        <Card
            className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red" }`}
            onClick={props.onClick}
        >
           <CardContent>
                {/* Tile */}
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>

                {/* Number of cases*/}
                <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
                    {cases}
                </h2>

                {/* Total cases in M*/}
                <Typography class="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
           </CardContent>
       </Card>
    )
}

export default InfoBox
