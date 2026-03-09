<?php

namespace App\Source\Facility\Enums;

enum CityEnum: string
{
    case DUMAGUETE = 'Dumaguete';
    case TANJAY = 'Tanjay';
    case VALENCIA = 'Valencia';
    case BACONG = 'Bacong';
    case SIBULAN = 'Sibulan';
    case BAIS = 'Bais';
    case CANLAON = 'Canlaon';
    case AMLAN = 'Amlan';
    case AYUNGON = 'Ayungon';
    case BINDOY = 'Bindoy';
    case DAUIN = 'Dauin';
    case GUIHULNGAN = 'Guihulngan';
    case JIMALALUD = 'Jimalalud';
    case LA_LIBERTAD = 'La Libertad';
    case MABINAY = 'Mabinay';
    case MANJUYOD = 'Manjuyod';
    case PAMPLONA = 'Pamplona';
    case SAN_JOSE = 'San Jose';
    case SANTA_CATALINA = 'Santa Catalina';
    case SIATON = 'Siaton';
    case TAYASAN = 'Tayasan';
    case VALLEHERMOSO = 'Vallehermoso';
    case ZAMBOANGUITA = 'Zamboanguita';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
