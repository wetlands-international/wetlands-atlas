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
