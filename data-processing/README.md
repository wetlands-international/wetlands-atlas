Wetlands - Data Processing
==============================

Data processing notebooks and scripts for the Wetlands project.

--------

## Setup

### The environment

To run the notebooks you need to create an environment with the dependencies. There are two options:

#### Docker

If you have [docker](https://docs.docker.com/engine/install/) in your system,
you run a jupyter lab server with:

``` bash
docker compose up --build
```

And if you want to get into the container, use a terminal in jupyter lab,
vscode remote development or run this command:

```shell
docker exec -it data_processing_notebooks /bin/bash
```

#### UV environment

**If the enviroment is not already created**

Create the environment with:

``` bash
uv venv
```


Initialize the project (if not already initialized), this will create the `project.toml` file (if it does not exist):

``` bash
uv init
```

To activate the environment:
``` bash
source .venv/bin/activate
```

To install packages and automatically track dependencies in the `pyproject.toml`file, use:
```bash
uv add <package-name>
```

To make the `processing` package available in the environment, you can install it in editable mode:
```bash
pip install -e .
```

**If the environment is already created**

To replicate the project environment on another machine:
``` bash
uv venv
uv sync
```
This installs all dependencies listed in `pyproject.toml`.

To activate the environment:
``` bash
source .venv/bin/activate
```

To add new packages to the environment, you can use:
```bash
uv add <package-name>
```

To make the `processing` package available in the environment, you can install it in editable mode:
```bash
pip install -e .
```

### `git` (if needed) and pre-commit hooks

If this project is a new and standalone (not a module in a bigger project), you need to initialize git:

``` bash
git init
```

If the project is already in a git repository, you can skip this step.

To install the **pre-commit hooks**, with the environment activated and in the project root directory, run:

``` bash
pre-commit install
```

## Update the environment

If you need to add a new package to your project, you can install it using `uv pip`:
```bash
uv pip install <package_name>
```
Then, to update the `requirements.txt` file, run:

```bash
uv pip freeze > requirements.txt
```

## Data Processing Guide

#### Prerequisites

Before running the data processing scripts, ensure you have:

1. **Environment Setup**: Follow the setup instructions above to create and activate your environment
2. **Install the Processing Package**: Make sure the processing package is available by running:
   ```bash
   pip install -e .
   ```
3. **Sahel Boundary File**: Ensure you have the [Sahel region boundary file](https://drive.google.com/file/d/10I6Z6k_5laK70n1BpnWC_BWAHR8IbF2g/view?usp=drive_link) at:
   ```
   data/raw/Sahel-zone - extended - dissolved.gpkg
   ```
4. **AWS Credentials** (optional): If you want to upload results to S3, configure your AWS credentials in a `.env` file:
   ```
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_SESSION_TOKEN=your_session_token  # if using temporary credentials
   AWS_DEFAULT_REGION=your_region
   AWS_BUCKET_NAME=your_bucket_name
   ```

### 1. Downloading Vector Data

This project includes an automated script to download and process vector data for the Wetlands project. The script handles two main data sources:

1. **HydroBASINS Africa**: Watershed boundary data from HydroSHEDS
2. **Country Boundaries**: Administrative boundaries for Sahel region countries from OpenStreetMap


#### Running the Complete Data Processing Workflow

To download and process all vector data, simply run:

```bash
python scripts/download_vector_data.py
```

This script will:

1. **Download HydroBASINS Africa data** from Google Cloud Storage
2. **Process the watershed data** to create major and sub-basin hierarchies
3. **Filter basins** to only include those intersecting the Sahel region
4. **Download country boundaries** for 22 Sahel region countries from OpenStreetMap
5. **Process country data** including adding ISO3 codes and bounding boxes
6. **Save processed data** as GeoJSON files in `data/processed/`
7. **Upload results to S3** (if configured)

#### Output Files

The script generates the following processed files:

- `data/processed/hydrobasins_sahel.geojson` - Watershed boundaries for the Sahel region
- `data/processed/countries_sahel.geojson` - Country boundaries for Sahel region countries
