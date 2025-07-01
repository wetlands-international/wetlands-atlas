"""
This module provides functions to retrieve country data using OSMnx and
convert country names to ISO 3166-1 alpha-3 codes.
"""

import osmnx as ox
import pandas as pd
import pycountry


def get_multiple_countries_osmx(country_list):
    """
    Get multiple countries using OSMnx
    """
    all_countries = []

    for country in country_list:
        try:
            country_gdf = ox.geocode_to_gdf(country, which_result=1)
            country_gdf["country_name"] = country
            all_countries.append(country_gdf)
            print(f"Successfully got data for {country}")
        except Exception as e:
            print(f"Failed to get data for {country}: {e}")

    if all_countries:
        combined_gdf = pd.concat(all_countries, ignore_index=True)
        return combined_gdf
    else:
        return None


def name_to_iso3(name):
    """
    Convert a country name to its ISO 3166-1 alpha-3 code.
    """
    try:
        if name == "The Gambia":
            name = "Gambia"
        return pycountry.countries.lookup(name).alpha_3
    except LookupError:
        print(f"Country name '{name}' not found in pycountry.")
        return None
