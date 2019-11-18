<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Psr\Log\LoggerInterface;

class BaseController extends AbstractController
{

    public function log(LoggerInterface $logger, String $msg, Array $context, String $level)
    {
        $logger->{$level}($msg, $context);        
    }

    public function isError(String $msg = 'System Error'): Array
    {
        return [
            'msg' => $msg,
            'status' => FALSE
        ];
    }
}