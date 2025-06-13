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

Create the environment with Python 3.12:

``` bash
uv venv --python 3.12
```

The virtual environment can be "activated" to make its packages available:

``` bash
source .venv/bin/activate

To replicate project's environment use your the `requirements.txt` file.
```bash
uv pip install -r requirements.txt
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
