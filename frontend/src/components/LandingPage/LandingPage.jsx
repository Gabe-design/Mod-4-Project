// frontend/src/components/LandingPage/LandingPage.jsx

// Tools from react
import { useEffect } from 'react';
// Redux state and dispatching actions
import { useSelector, useDispatch } from 'react-redux';
// For the spot thunk
import {fetchSpots } from '../../store/spots';
// To link the spot detail page
import { Link } from 'react-router-dom';
// Styles 
import './LandingPage.css'

// This renders the homepage lsit
function LandingPage() {
    const dispatch = useDispatch();
    
    // Pulls all the spots
    const spots = useSelector( state => state.spots );
    // This makes object to an array
    const spotArr = spots ? Object.values( spots ) : [];
    console.log( "SPOT ARRAY:", spotArr);

    // load all spots
    useEffect(() => {
        dispatch( fetchSpots());

    }, [ dispatch ]);

    if ( !spotArr.length ) return <div>Loading Havens...Loading Havens...</div>;

    // This will render each spot as a tile
    return (
        <div className = "spot-list-container">
            { spotArr.map( spot => (
                <Link key={ spot.id } to={ `/spots/${ spot.id }`} className="spot-tile" data-name={ spot.name }>
                    <div className="spot-img-wrapper">
                        <img src={ spot.previewImage } alt={ spot.name }/>
                    </div>
                    <div className="spot-tile-text">
                        <div className="spot-location"> 
                            {spot.city}, { spot.state }
                        </div>
                        <div className="spot-name" title={ spot.name }>
                             { spot.name }
                        </div>
                        <div className="spot-price">
                             ${ spot.price } <span>night</span>
                        </div>
                        <div className="spot-rating">
                            <i className="fa fa-star"/>
                             { spot.avgRating ? ` ${spot.avgRating.toFixed(1)}` : ' New' }
                        </div>
                    </div>

                </Link>
            ))}
        </div>
    )
}

// Export
export default LandingPage;