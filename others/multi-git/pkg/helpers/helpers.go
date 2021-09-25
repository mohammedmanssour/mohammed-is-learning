package helpers

import (
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"path"
)

func ConfigureGit() (err error) {
	err = exec.Command("git", "config", "--global", "user.email", "manssour.mohammed@gmail.com").Run()
	if err != nil {
		return
	}

	err = exec.Command("git", "config", "--global", "user.name", "Mohammed Manssour").Run()
	return
}

//CreateDir creates a directory and optionally initializes git in that directory
func CreateDir(baseDir string, name string, initGit bool) (err error) {
	dirName := path.Join(baseDir, name)
	err = os.MkdirAll(dirName, os.ModePerm)
	if err != nil {
		return
	}

	if !initGit {
		return
	}

	currDir, err := os.Getwd()
	if err != nil {
		return
	}

	defer func() {
		err = os.Chdir(currDir)
	}()
	err = os.Chdir(dirName)
	if err != nil {
		return fmt.Errorf("[create-dir]: can not check into the %s directory", dirName)
	}
	err = exec.Command("git", "init").Run()
	return
}

//AddFiles adds files with some canned content to populate a directory
func AddFiles(baseDir string, dirName string, commit bool, filenames ...string) (err error) {
	dir := path.Join(baseDir, dirName)
	for _, filename := range filenames {
		data := []byte("data for" + filename)
		err = ioutil.WriteFile(path.Join(dir, filename), data, 0777)
		if err != nil {
			return
		}
	}

	if !commit {
		return
	}

	currDir, err := os.Getwd()
	if err != nil {
		return
	}
	defer func() {
		err = os.Chdir(currDir)
	}()
	err = os.Chdir(dir)
	if err != nil {
		return fmt.Errorf("[add-files]: can not check into the %s directory", dirName)
	}
	err = exec.Command("git", "add", "-A").Run()
	if err != nil {
		return
	}

	err = exec.Command("git", "commit", "-m", "added some files...").Run()
	return
}

func RunMultiGit(command string, ignoreErrors bool, mgRoot string, mgRepos string) (output string, err error) {
	out, err := exec.Command("which", "mg").CombinedOutput()
	if err != nil {
		return
	}

	if len(out) == 0 {
		err = errors.New("mg is not in the PATH")
		return
	}

	components := []string{command}
	if ignoreErrors {
		components = append(components, "--ignore-errors")
	}
	cmd := exec.Command("mg", components...)
	cmd.Env = os.Environ()
	cmd.Env = append(cmd.Env, "MG_ROOT="+mgRoot, "MG_REPOS="+mgRepos)
	out, err = cmd.CombinedOutput()
	output = string(out)
	return

}
